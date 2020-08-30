#!/usr/bin/env node

const util = require('util');
const exec = util.promisify(require('child_process').exec);
const prompts = require('prompts');

async function getProfiles() {
  const { stdout: profiles } = await exec('aws configure list-profiles');
  const profile_array = profiles
    .trim()
    .split(/\s+/)
    .map(value => {
    return { value }
});
  return profile_array;
}

async function run() {
  const choices = await getProfiles();
  const { profile } = await prompts({
    type: 'select',
    name: 'profile',
    message: 'Select an AWS profile to switch to',
    choices,
  });

  await writeProfile(profile);
}

async function writeProfile(profile) {
  if (!profile) {
    return;
  }

  exec(`sed -i"b" 's/export AWS_PROFILE=".*"/export AWS_PROFILE="${profile}"/' ~/.zshrc`)
}

function onError(e) {
  console.error(e);
}

run().catch(onError);

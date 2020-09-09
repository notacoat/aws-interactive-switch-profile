#!/usr/bin/env node

const fs = require('fs');
const prompts = require('prompts');
const util = require('util');
const exec = util.promisify(require('child_process').exec);


function onError(e) {
  if (e.stderr) {
    process.stderr.write(e.stderr)
  } else {
    console.error(e)
  }
  process.exit(1);
}

async function checkAWS() {
  await exec('aws --version', (error, _, stderr) => {
    if (error) {
      console.error('Please install AWS CLI.');
      process.exit(1);
    } else if (stderr) {
      throw (stderr);
    }
  });
}

async function checkFile() {
  const fileName = process.argv[2];
  if (!fileName) {
    throw ('Please specify a temp file argument');
  }
  if (!fs.existsSync(fileName)) {
    throw ('The temp file does not exist.');
  }
}

async function getProfiles() {
  const { stdout: profiles } = await exec('aws configure list-profiles');
  return profiles
    .trim()
    .split(/\s+/)
    .map((value) => {
      return { value }
    });
}

async function writeFile(profile) {
  try {
    tmpFile = process.argv[2];
    fs.writeFileSync(tmpFile, profile);
  } catch (error) {
    throw (error);
  }
}

async function run() {
  checkFile().catch(onError);
  checkAWS().catch(onError);
  const choices = await getProfiles();
  const { profile } = await prompts({
    type: 'select',
    name: 'profile',
    message: 'Select an AWS profile to switch to',
    choices,
  });

  await writeFile(profile).catch(onError);
}

run().catch(onError);

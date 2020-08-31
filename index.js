#!/usr/bin/env node

const fs = require('fs');
const prompts = require('prompts');
const util = require('util');
const exec = util.promisify(require('child_process').exec);


async function requirementsCheck() {
  try {
    const fileName = process.argv[2];
    if (!fs.existsSync(fileName)) {
      console.error('The tmp file does not exist.');
    }
  } catch (err) {
    console.error(err);
  }

  await exec('aws --version', (error, _, stderr) => {
    if (error) {
      console.error('Please install AWS CLI.');
    } else if (stderr) {
      console.error('stderr');
    }
  });
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
  tmpFile = process.argv[2];
  try {
    fs.writeFileSync(tmpFile, profile);
  } catch(e) {
    console.error(e);
  }
}

async function run() {
  await requirementsCheck();
  const choices = await getProfiles();
  const { profile } = await prompts({
    type: 'select',
    name: 'profile',
    message: 'Select an AWS profile to switch to',
    choices,
  });

  await writeFile(profile);
}

function onError(e) {
  if (e.stderr) {
    process.stderr.write(e.stderr)
  } else {
    console.error(e)
  }
  process.exit(1);
}

run().catch(onError);

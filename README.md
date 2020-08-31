## aws-interactive-switch-profile

Utilizes `aws configure list-profiles` via [aws-cli](https://aws.amazon.com/cli/) to allow the switching of profiles using [Prompts](https://github.com/terkelg/prompts).  No more remembering what your AWS profiles are called and typing export statements in terminal.  Run the program via a helper shell function, select the profile you want to use and that's it.

### Install

> $ npm install -g aws-interactive-switch-profile

### Usage

`aws-switch-profiles '/tmp/foo.txt'`

Because you cannot persist global environment variables outside of Node and Prompts uses stdout, you must pass a writable temp file and also use some sort of helper function to facilitate the process.

> example zsh script
```
aisp() {
  unset _PROFILE;
  # creates tmp file
  tf=$(mktemp /tmp/aisp.XXXXXXXXX)
  # runs aws-switch-profiles and stores user selection to tmp file
  aws-switch-profiles $tf
  # reads in tmp file and stores to variable
  _PROFILE=$(<$tf);
  if [ -z $_PROFILE ];
    then
      echo "AWS_PROFILE not selected.";
    else
      export AWS_PROFILE=$_PROFILE
  fi

  rm $tf;
}
```

### Requirements

- AWS CLI
- Node ^8.17
  - Prompts ^2.3.0

### License
MIT



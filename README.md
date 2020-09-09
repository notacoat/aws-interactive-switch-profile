## aws-interactive-switch-profile

Do you use multiple named AWS profiles and switch between them on a regular basis? Instead of
remembering what your profiles are called and the proper aws commands to type, this tool allows quick switching between profiles via an interactive menu that queries your profiles using the [AWS-CLI](https://aws.amazon.com/cli/). Run the program via a helper shell function, select the profile you want to use and that's it.

![aws-interactive-switch-profile demo](https://raw.githubusercontent.com/notacoat/project-media/master/aws-interactive-switch-profile.gif)

### Install

> $ npm install -g aws-interactive-switch-profile

### Usage

`aws-switch-profiles '/tmp/foo.txt'`

Because you cannot persist global environment variables outside of Node and Prompts uses stdout, you must pass a writable temp file and also use some sort of helper function to facilitate the process.  See `sample-scripts` folder for fish and zsh functions.

> example zsh function
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



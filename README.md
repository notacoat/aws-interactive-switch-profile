## aws-interactive-switch-profile

Utilizes `aws configure list-profiles` via aws-cli to allow the switching of profiles via [prompts](https://github.com/terkelg/prompts).  No more remembering what your AWS profiles are called.  Run the program via a helper shell function, select the profile you want to use and that's it.


### Install

> $ npm install -g aws-interactive-switch-profile

### Usage

`aws-interactive-switch-profile '/tmp/foo.txt'`

Because you cannot persist global environment variables outside of Node, you must use some sort of helper function to facilitate this.

> example zsh script
```
aisp() {
    unset _PROFILE;
    # creates tmp file
    tf=$(mktemp /tmp/aisp.XXXXXXXXX)
    # runs aws-interactive-switch-profile and stores user selection to tmp file
    node aws-interactive-switch-profile $tf
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

### License
MIT



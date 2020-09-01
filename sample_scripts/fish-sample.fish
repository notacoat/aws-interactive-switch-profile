#######################################
#  Sample script for fish shell.      #
#  Run with `source fish-sample.fish` #
#######################################

set -e _PROFILE;

set tf (mktemp /tmp/aisp.XXXXXXXXX)
aws-switch-profiles $tf

read _PROFILE <$tf;
if [ -n "$_PROFILE" ];
    set -xg AWS_PROFILE $_PROFILE;
else
    echo "Profile not selected.";
end

rm $tf;

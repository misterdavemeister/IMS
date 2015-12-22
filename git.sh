auto=$1
heroku_branch=$2
commit=$3

branch=$(git symbolic-ref HEAD | sed -e 's,.*/\(.*\),\1,')
currentBranch=${branch:0}

if [[ "$auto" == 'auto' ]]; then 
  if [[ "$heroku_branch" == "master" || "$heroku_branch" == "" ]]; then
    heroku="master"
    echo
    echo "-Git.sh- Running Git commands in auto mode..."
    echo "-Git.sh- Branch to upload to Heroku: $heroku"
  elif [[ "$heroku_branch" == "current" ]]; then
    heroku=$currentBranch
    echo
    echo "-Git.sh- Running Git commands in auto mode..."
    echo "-Git.sh- Branch to upload to Heroku: $heroku"
  else
    echo
    echo '-Git.sh- ERROR: You must choose a branch to upload to heroku in Auto Mode'
    echo '-Git.sh- The branch must be either "master" or "current". Not specifying a branch will cause Git.sh to use the master branch.'
    echo '-Git.sh- Example: git.sh auto master "Initial commit"'
    echo '-Git.sh- Example: git.sh auto current "Initial commit"'
    exit 1
  fi
  if [[ "$commit" == "" ]]; then
    echo
    echo -n "-Git.sh- Enter commit message: " 
    read commit
  fi

  echo
  git add . 
  echo
  git commit -m "$commit"
  if [[ "$currentBranch" != "master" ]]; then
    echo
    echo '-Git.sh- merging master into current branch'
    git merge master
    echo
    echo '-Git.sh- Merging current branch back into master'
    git checkout master ; git merge $currentBranch
    echo
    echo "-Git.sh- Pushing $currentBranch to Github"
    git push origin $currentBranch
  fi
  echo
  echo '-Git.sh- Pushing master to Github'
  git push origin master
  if [[ "$heroku" == "master" ]]; then
    echo
    echo '-Git.sh- Pushing master to Heroku Master'
    git push heroku master
  elif [[ "$heroku_branch" == "current" ]]; then
    echo
    echo "-Git.sh- Pushing $heroku to Heroku Master"
    git push -f heroku $heroku:master
  fi
  echo
  git checkout $currentBranch
  exit 1
fi

finished='false'
while [ $finished == 'false' ]; do
  echo
  echo -n "-Git.sh- Add all? (y/n): "
  read -n 1 answer
  if [[ "$answer" == "y" || "$answer" == "Y" ]]; then
    echo
    finished='true'
    git add .
  elif [[ "$answer" == "n" || "$answer" == "N" || "$answer" == "" ]]; then
    echo
    finished='true'
    exit 1
  fi
done

finished='false'
while [ $finished == 'false' ]; do
  echo
  echo -n "-Git.sh- Commit changes? (y/n): "
  read -n 1 answer
  if [[ "$answer" == "y" || "$answer" == "Y" ]]; then
    echo
    finished='true'
    echo
    echo -n "-Git.sh- Enter commit message: " 
    read answer
    git commit -m "$answer"
  elif [[ "$answer" == "n" || "$answer" == "N" || "$answer" == "" ]]; then
    echo
    finished='true'
    exit 1
  fi
done

finished='false'
while [ $finished == 'false' ]; do
  if [[ "$currentBranch" != "master" ]]; then
    echo
    echo -n "-Git.sh- Merge master into $currentBranch? (y/n/q): "
    read -n 1 answer
    if [[ "$answer" == "y" || "$answer" == "Y" ]]; then
      echo
      finished='true'
      git merge master
    elif [[ "$answer" == "n" || "$answer" == "N" || "$answer" == "" ]]; then
      echo
      finished='true'
    elif [[ "$answer" == "q" || "$answer" == "Q" ]]; then
      echo
      finished='true'
      exit 1
    fi
  fi
done

finished='false'
while [ $finished == 'false' ]; do
  if [[ "$currentBranch" != "master" ]]; then
    echo
    echo -n "-Git.sh- Merge $currentBranch into master? (y/n/q): "
    read -n 1 answer
    if [[ "$answer" == "y" || "$answer" == "Y" ]]; then
      echo
      finished='true'
      git checkout master ; git merge $currentBranch
    elif [[ "$answer" == "n" || "$answer" == "N" || "$answer" == "" ]]; then
      echo
      finished='true'
    elif [[ "$answer" == "q" || "$answer" == "Q" ]]; then
      echo
      finished='true'
      exit 1
    fi
  fi
done

finished='false'
while [ $finished == 'false' ]; do
  echo
  echo -n "-Git.sh- Push master to origin/master? (y/n/q): "
  read -n 1 answer
  if [[ "$answer" == "y" || "$answer" == "Y" ]]; then
    echo
    finished='true'
    git push origin master
  elif [[ "$answer" == "n" || "$answer" == "N" || "$answer" == "" ]]; then
    echo
    finished='true'
  elif [[ "$answer" == "q" || "$answer" == "Q" ]]; then
    echo
    finished='true'
    exit 1
  fi
done

finished='false'
while [ $finished == 'false' ]; do
  if [[ "$currentBranch" != "master" ]]; then
    echo
    echo -n "-Git.sh- Push $currentBranch to origin/$currentBranch? (y/n/q): "
    read -n 1 answer
    if [[ "$answer" == "y" || "$answer" == "Y" ]]; then
      echo
      finished='true'
      git push origin $currentBranch
    elif [[ "$answer" == "n" || "$answer" == "N" || "$answer" == "" ]]; then
      echo
      finished='true'
    elif [[ "$answer" == "q" || "$answer" == "Q" ]]; then
      echo
      finished='true'
      exit 1
    fi
  fi
done

finished='false'
while [ $finished == 'false' ]; do
  echo
  echo -n "-Git.sh- Push master to heroku/master? (y/n/q): "
  read -n 1 answer
  if [[ "$answer" == "y" || "$answer" == "Y" ]]; then
    echo
    finished='true'
    heroku='true'
    git push heroku master
  elif [[ "$answer" == "n" || "$answer" == "N" || "$answer" == "" ]]; then
    echo
    finished='true'
    heroku='false'
  elif [[ "$answer" == "q" || "$answer" == "Q" ]]; then
    echo
    finished='true'
    exit 1
  fi
done

if [[ "$heroku" == "false" ]]; then
  finished='false'
  while [ $finished == 'false' ]; do
    echo
    echo -n "-Git.sh- Push $currentBranch to heroku/master? (y/n/q): "
    read -n 1 answer
    if [[ "$answer" == "y" || "$answer" == "Y" ]]; then
      echo
      finished='true'
      git push -f heroku $currentBranch:master
    elif [[ "$answer" == "n" || "$answer" == "N" || "$answer" == "" ]]; then
      echo
      finished='true'
    elif [[ "$answer" == "q" || "$answer" == "Q" ]]; then
      echo
      finished='true'
      exit 1
    fi
  done
fi
  
if [[ "$currentBranch" != "master" ]]; then
  echo
  git checkout $currentBranch
fi

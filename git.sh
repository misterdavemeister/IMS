source ~/.git-prompt.sh

echo "-Git.sh- Add all? (y/n): "
read -n 1 answer
if [[ "$answer" == "y" || "$answer" == "Y" ]]; then
  git add .
else
  exit 1
fi

echo "-Git.sh- Commit changes? (y/n): "
read -n 1 answer
if [[ "$answer" == "y" || "$answer" == "Y" ]]; then
  echo "-Git.sh- Enter commit message: " 
  read answer
  git commit -m "$answer"
else
  exit 1
fi

echo "-Git.sh- Merge master into this branch? (y/n/q): "
branch=$(git symbolic-ref HEAD | sed -e 's,.*/\(.*\),\1,')
currentBranch=${branch:0}
echo -n "Current branch is: " 
echo $currentBranch
read -n 1 answer
if [[ "$answer" == "y" || "$answer" == "Y" ]]; then
  git merge master
elif [[ "$answer" == "q" || "$answer" == "Q" ]]; then
  exit 1
fi

echo "-Git.sh- Merge this branch into master? (y/n/q): "
branch=$(git symbolic-ref HEAD | sed -e 's,.*/\(.*\),\1,')
currentBranch=${branch:0}
echo -n "Current branch is: " 
echo $currentBranch
read -n 1 answer
if [[ "$answer" == "y" || "$answer" == "Y" ]]; then
  git checkout master ; git merge $currentBranch
elif [[ "$answer" == "q" || "$answer" == "Q" ]]; then
  exit 1
fi

echo "-Git.sh- Push master to origin/master? (y/n/q): "
read -n 1 answer
if [[ "$answer" == "y" || "$answer" == "Y" ]]; then
 git push origin master
elif [[ "$answer" == "q" || "$answer" == "Q" ]]; then
  exit 1
fi

if [[ "$currentBranch" != "master" ]]; then
  echo "-Git.sh- Push $currentBranch to origin/$currentBranch? (y/n/q): "
  read -n 1 answer
  if [[ "$answer" == "y" || "$answer" == "Y" ]]; then
    git push origin $currentBranch
  elif [[ "$answer" == "q" || "$answer" == "Q" ]]; then
    exit 1
  fi
fi

echo "-Git.sh- Push master to heroku/master? (y/n/q): "
read -n 1 answer
if [[ "$answer" == "y" || "$answer" == "Y" ]]; then
  git push heroku master
elif [[ "$answer" == "q" || "$answer" == "Q" ]]; then
  exit 1
fi

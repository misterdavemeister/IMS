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

echo "-Git.sh- Merge master into this branch? (y/n): "
read -n 1 answer
if [[ "$answer" == "y" || "$answer" == "Y" ]]; then
  git merge master
elif [[ "$answer" == "q" || "$answer" == "Q" ]]; then
  exit 1
fi

echo "-Git.sh- Merge this branch into master? (y/n): "
branch = "\$(__git_ps1)"
echo $branch
read -n 1 answer
if [[ "$answer" == "y" || "$answer" == "Y" ]]; then
  git checkout master ; git merge $branch
elif [[ "$answer" == "q" || "$answer" == "Q" ]]; then
  exit 1
fi

echo "-Git.sh- Push master to origin/master? (y/n): "
read -n 1 answer
if [[ "$answer" == "y" || "$answer" == "Y" ]]; then
  git push origin master
fi


echo "-Git.sh- Push \$(branch) to origin/\$(branch)? (y/n): "
read -n 1 answer
if [[ "$answer" == "y" || "$answer" == "Y" ]]; then
  git push origin $branch
fi

echo "-Git.sh- Push master to heroku/master? (y/n): "
read -n 1 answer
if [[ "$answer" == "y" || "$answer" == "Y" ]]; then
  git push heroku master
fi

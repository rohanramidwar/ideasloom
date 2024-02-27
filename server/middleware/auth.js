import jwt from "jsonwebtoken";
//after user signin/signup he gets a token
//if he wants to like or unlike... we need to check if he's token is valid

//wants to like post
//clicks on like btn -> auth midddleware -> if okay -> next -> likeController...
const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    let decodedData; //data that we want to get from token

    decodedData = jwt.verify(token, "test"); //gives username and id
    //now we know which user has logged in and who is liking the post
    req.userId = decodedData?.id; //users id

    next(); //to pass the actions to second thing
  } catch (error) {
    console.log(error.message);
  }
};

export default auth; //used in routes

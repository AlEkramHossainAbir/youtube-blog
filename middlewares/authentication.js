function checkForAuthenticationCookie(cookieName){
    return (req,res,next)=>{
        const tokenCookieValue = req.cookies[cookieName];
        if(!tokenCookieValue){
            return res.redirect("/user/signin");
        }
        next();

    }

}

module.exports = {checkForAuthenticationCookie}
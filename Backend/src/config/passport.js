import passport from "passport";
import {Strategy as GitHubStrategy} from "passport-github2";
import User from "../models/UserModel.js";

passport.serializeUser((user,done)=>{
    done(null,user.id);
});

passport.deserializeUser(async (id,done)=>{
    try {
        const user = await User.findById(id);
        done(null,user);
    } catch (error) {
        done(error);
    }
});

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "/auth/github/callback",
    scope: ["user:email"],
    passReqToCallback: true

},
async (accesToken, refreshToken, profile, done)=>{
    try{
        const email =
        Array.isArray(profile.emails) && profile.emails.length? (profile.emails.find(e=> e.primary)?.value ||profile.emails[0].value) : undefined;

        let user = await User.findOne({githubId: profile.id});

        if (user) {
        // keep user data fresh
        user.lastLogin = new Date();
        user.username = profile.username || user.username;
        user.displayName = profile.displayName || user.displayName;
        user.avatar = profile.photos?.[0]?.value || user.avatar;
        user.profileUrl = profile.profileUrl || user.profileUrl;
        if (!user.email && email) user.email = email;
        await user.save();
        return done(null, user);
      }

      user = await User.create({
        githubId: profile.id,
        username: profile.username,
        displayName: profile.displayName,
        email,
        avatar: profile.photos?.[0]?.value,
        profileUrl: profile.profileUrl
      });

      return done(null, user);

    }catch(err){
        return done(err);
    }
}
));

export default passport;
import passport from "passport";
import {Strategy as GitHubStrategy} from "passport-github2";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/UserModel.js";
import dotenv from "dotenv";
dotenv.config();

passport.serializeUser((user,done)=>{
    done(null,user.id);
});

passport.deserializeUser(async (id,done)=>{
    try {
        const user = await User.findById(id);
        done(null,user);
    } catch (error) {
        done(error, null);
    }
});

passport.use(
    new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/api/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
        try{
            const email = profile.emails?.[0]?.value;
            // check if user already exists
            let user = await User.findOne({ email: email });
            if (user) {
                // User exists, update lastLogin
                user.lastLogin = new Date();
                user.username = profile.username || user.username;
                user.displayName = profile.displayName || user.displayName;
                user.avatar = profile.photos?.[0]?.value || user.avatar;
                user.profileUrl = profile.profileUrl || user.profileUrl;
                await user.save();
                return done(null, user);
            }
            // User doesn't exist, create a  new one
            user = await User.create({
                googleId: profile.id,
                username: profile.displayName,
                email: profile.emails[0].value,
                avatar: profile.photos[0].value,
                profileUrl: profile.profileUrl
            });
            done(null, user);
        }catch(err){
            done(err,null);
        }
    }
))

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "/api/auth/github/callback",
    scope:[ "user:email" ]

},
async (accesToken, refreshToken, profile, done)=>{
    try{
        const email =
        Array.isArray(profile.emails) && profile.emails.length? (profile.emails.find(e=> e.primary)?.value ||profile.emails[0].value) : undefined;

        let user = await User.findOne({email: email});

        if (user) {
        // keep user data fresh
        user.lastLogin = new Date();
        user.username = profile.username || user.username;
        user.displayName = profile.displayName || user.displayName;
        user.avatar = profile.photos?.[0]?.value || user.avatar;
        user.profileUrl = profile.profileUrl || user.profileUrl;
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
var mongoose = require('mongoose');

var timestamps = require('mongoose-timestamp');
var UserSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true
    },
    avatarurl: {
		type: String
	},
	email: {
		type: String,
		unique: true,
		match: [/.+\@.+\..+/, "Please fill a valid email address"]
	},
	roles: [{ type: 'String' }],
	isVerified: { type: Boolean, default: false },
	password: {
		type: String,
		validate: [
			function(password) {
				return password && password.length > 5;
			}, 'Password should be longer'
		]
	},
	googleProvider: {
		type: {
			id: String,
			token: String
		},
		select: false
	},
	passwordResetToken: String,
	passwordResetExpires: Date
});
UserSchema.plugin(timestamps);
// mongoose.model('User', UserSchema);

UserSchema.statics.upsertGoogleUser = function(accessToken, refreshToken, profile, cb) {
	var that = this;
	return this.findOne({
		'googleProvider.id': profile.id
	}, function(err, user) {
		// no user was found, lets create a new one
		if (!user) {
			var newUser = new that({
				name: profile.displayName,
				email: profile.emails[0].value,
				avatarurl: profile._json.picture,
				googleProvider: {
					id: profile.id,
					token: accessToken
				}
			});

			newUser.save(function(error, savedUser) {
				if (error) {
					console.log(error);
				}
				return cb(error, savedUser);
			});
		} else {
			return cb(err, user);
		}
	});
};
module.exports = mongoose.model('User', UserSchema)

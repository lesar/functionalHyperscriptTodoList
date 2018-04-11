//https://github.com/infernojs/eslint-plugin-inferno/
module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "sourceType": "module"
    },
		"plugins": [
			"inferno"
		],
		"settings": {
			"inferno": {
				"pragma": "Inferno"  // Pragma to use, default to "Inferno"
				//"version": "1.4" // Inferno version, default to the latest Inferno stable release
			}
		},
    "rules": {
				"extends": ["eslint:recommended", "plugin:inferno/recommended"], //vedi se è il caso di toglierla e lasciare solo inferno/prop-types
				"inferno/prop-types": [
					"error"
				],
        "indent": [
            "error",
            "tab"
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "double"
        ],
        "semi": [
            "error",
            "always"
        ]
    }
};
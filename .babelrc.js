// Copyright (c) 2014-present, Facebook, Inc. All rights reserved.

module.exports = {
    // See https://babeljs.io/docs/en/babel-preset-env#targets
    presets: [
        ['@babel/preset-env',
            {
                targets: {
                    node: 'current'
                }
            }
        ]
    ],
};

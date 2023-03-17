module.exports = {
    trantransformsform: {
        "^.+\\.jsx?$": ["babel-jest", { presets: ["@babel/preset-env"] }],
    },
    moduleFileExtensions: ["js", "jsx"],
    setupFilesAfterEnv: ["@testing-library/react/cleanup-after-each"],
};
  
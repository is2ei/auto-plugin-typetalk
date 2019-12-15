auto-typetalk-plugin
===
[![Build Status](https://travis-ci.com/is2ei/auto-plugin-typetalk.svg?branch=master)](https://travis-ci.com/is2ei/auto-plugin-typetalk)
[![codecov](https://codecov.io/gh/is2ei/auto-plugin-typetalk/branch/master/graph/badge.svg)](https://codecov.io/gh/is2ei/auto-plugin-typetalk)




[auto](https://intuit.github.io/auto/pages/introduction.html) plugin to post your release notes to Typetalk.

## Installation
This plugin is not included with the `auto` CLI installed via NPM. To install:
```sh
npm i --save-dev auto-typetalk-plugin
# or
yarn add -D auto-typetalk-plugin
```

## Prerequisites
To post messages to Typetalk you need the following secrets set in your environment:
- `TYPETALK_TOKEN`
- `TYPETALK_TOPIC_ID`

## Usage
To use this plugin include it in your `.autorc`
```json
{
  "plugins": [
    ["typetalk"]
  ]
}
```

With mentions
```json
{
  "plugins": [
    ["typetalk", { "mentions": [ "all", "here", "bob" ]}]
  ]
}
```

For working example, see:
https://github.com/is2ei/auto-plugin-typetalk-example

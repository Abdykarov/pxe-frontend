#!/bin/bash

yarn install

{
    CHROME_BIN=/usr/bin/chromium ng test --karma-config karma.jenkins.conf.js angular-devstack > ng-test-output.txt
    CHROME_BIN=/usr/bin/chromium ng e2e --protractor-config protractor.jenkins.conf.js > ng-e2e-output.txt
    yarn lint > ng-lint-ts-output.txt
    yarn lint:scss > ng-lint-scss-output.txt
} || {
    echo "Tests FAILED"
}

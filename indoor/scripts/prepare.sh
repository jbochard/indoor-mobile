#!/bin/bash
cd ../indoor-src
ng build --target=production --environment=prod --output-path ../indoor/www/ --base-href .
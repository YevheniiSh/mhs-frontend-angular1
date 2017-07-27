'use strict';

angular.module('mhs.version', [
    'mhs.version.interpolate-filter',
    'mhs.version.version-directive'
])

.value('version', '0.1');

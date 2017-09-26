window.openFirebaseConnections = [];
angular
    .module('firebaseDataService', []).config(configFunction);

configFunction.$inject = ['$provide'];

function configFunction($provide) {
    // inject the $delegate dependency into our decorator method
    firebaseDecorator.$inject = ['$delegate'];

    // Whenever $firebaseArray's and $firebaseObjects are created,
    // they'll now be tracked by window.openFirebaseConnections
    $provide.decorator("$firebaseArray", firebaseDecorator);
    $provide.decorator("$firebaseObject", firebaseDecorator);

    function firebaseDecorator($delegate) {
        return function (ref) {
            var list = $delegate(ref);
            window.openFirebaseConnections.push(list);
            return list;
        };
    }
}
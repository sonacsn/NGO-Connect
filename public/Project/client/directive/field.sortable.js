(function(){
    angular
        .module("uiDirectives", [])
        .directive("uiSortable", uiSortable);

    function uiSortable() {
        function link(scope, element, attrs) {
            var start = null;
            var end   = null;
            $(element)
                .sortable({
                    axis: "y",
                    handle: '.handle',
                    sort: function(event, ui) {
                        //ui.helper.find("a").hide();
                        start = ui.item.index();
                    },
                    stop: function(event, ui) {
                        //ui.item.find("a").show();
                        end = ui.item.index();
                        if(start >= end) {
                            start--;
                        }
                        console.log(start,end)
                        scope.vm.checker(start,end);
                    }
                });
        }
        return {
            /*scope: {
                uiSortableCallback: '&'
            },*/
            link: link
        };
    }
})();
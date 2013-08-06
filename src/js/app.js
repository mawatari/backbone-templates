/**
 * President View
 */
MyApp.App = Backbone.View.extend({
    el: '#app',

    template: MyApp.Templates.layout,

    initialize: function() {
        // Mediatorの作成
        _.extend(MyApp.Mediator, Backbone.Events);

        this.$el.html(this.template());

        this.message_list = new MyApp.Views.Sample({
            el: this.$el.find('#sample'),
        });
    }
});

new MyApp.App();

sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/library",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,	library, JSONModel
    ) {
        "use strict";

        var url_object = library.URLHelper

        return Controller.extend("consultaprodutos.controller.Main", {
            onInit: function () {
                var produto = {};
                var productModel = new JSONModel(produto);
                var view = this.getView();
                view.setModel(productModel,"ModeloProduto");
            },
            onPressBuscar: function(){
                
                var input; 
                input = this.byId("inpBusca").getValue();    
                //alert("executou "+input);

                var parameters = {
                    url : 'https://world.openfoodfacts.org/api/v2/product/'+input,
                    method: 'GET',
                    async: true,
                    crossDomain : true,
                };

                $.ajax(parameters).done(function(response){
                    var oProdutoModel = this.getView().getModel("ModeloProduto");
                    oProdutoModel.setData({});
                    oProdutoModel.refresh();
                    oProdutoModel.setData(response);
                    oProdutoModel.refresh();
                }.bind(this))
                .fail(function(){

                });

      

            },
            onClickImage: function(oEvent){
               url_object.redirect(oEvent.getSource().getSrc(), true);
            }
        });
    });

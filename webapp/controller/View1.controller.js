sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("zcursopfrapp1.controller.View1", {
           onInit: function () {

            },

            onCreate: function(){
                var that = this;
                var usuario = this.getView().byId("idusuario").getValue();
                var nome = this.getView().byId("idnome").getValue();
                var proj = this.getView().byId("idproj").getValue();
                var email = this.getView().byId("idemail").getValue();

                if(!usuario){

                    sap.m.MessageBox.error(this.getView().getModel("i18n").getResourceBundle().getText("lblMsgErroUser"));
                    return;
                }

                var oDados = {
                    Usuario: usuario,
                    Nome: nome,
                    ProjetoSegw: proj,
                    Email: email

                }
                this.getView().getModel().create('/AlunoFioriSet', oDados, {
                    success: function(oData, oResponse){
                        sap.m.MessageBox.success(that.getView().getModel("i18n").getResourceBundle().getText("lblMsgCreateOK"))
                        that.getView().byId("idusuario").setValue("");
                        that.getView().byId("idnome").setValue("");
                        that.getView().byId("idproj").setValue("");
                        that.getView().byId("idemail").setValue("");
                    },
                    error: function(oError){
                        sap.m.MessageBox.success(that.getView().getModel("i18n").getResourceBundle().getText("lblMsgCreateError"))
                    }
                } )
            }

        });
        
    });

sap.ui.define(
  ["sap/ui/core/mvc/Controller"],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller) {
    "use strict";

    return Controller.extend("zcursopfrapp1.controller.View1", {
      onInit: function () {},

      onChangeUsuario(){

        let idusuario = this.getView().byId("idusuario").getValue()

        if(idusuario){

          this.onQuery(idusuario)
        }
      },  

      onQuery: function (usuario) {
        let that = this
        let oModel = this.getView().getModel()
        let entidade = "/AlunoFioriSet"

        this.getView()
          .getModel()
          .read(entidade, {
            filters: [
              new sap.ui.model.Filter(
                "Usuario",
                sap.ui.model.FilterOperator.EQ, usuario
              ),
            ],
            success: function (oData, oResponse) {
              sap.m.MessageBox.success(
                that
                  .getView()
                  .getModel("i18n")
                  .getResourceBundle()
                  .getText("lblMsgFound")
              );
            },
            error: function (oError) {
              sap.m.MessageBox.error(
                that
                  .getView()
                  .getModel("i18n")
                  .getResourceBundle()
                  .getText("lblMsgNotFound")
              );
            },
          });
      },

      onDelete: function () {
        var that = this;
        var totRemove = this.getView().byId("idtablealuno").getSelectedItems();

        for (var i = 0; i < totRemove.length; i++) {
          var sPath = totRemove[i].getBindingContextPath();

          //var sPath = this.getView()
          //  .byId("idtablealuno")
          //  .getSelectedContextPaths();

          this.getView()
            .getModel()
            .remove(sPath, {
              success: function (oData, oResponse) {
                sap.m.MessageBox.success(
                  that
                    .getView()
                    .getModel("i18n")
                    .getResourceBundle()
                    .getText("lblMsgRemoveOk")
                );
                return;
              },
              error: function (oError) {
                sap.m.MessageBox.success(
                  that
                    .getView()
                    .getModel("i18n")
                    .getResourceBundle()
                    .getText("lblMsgRemoveError")
                );
              },
            });
        }
      },

      onUpdate: function () {
        var that = this;
        var usuario = this.getView().byId("idusuario").getValue();
        var nome = this.getView().byId("idnome").getValue();
        var proj = this.getView().byId("idproj").getValue();
        var email = this.getView().byId("idemail").getValue();

        var sPath = this.getView()
          .byId("idtablealuno")
          .getSelectedContextPaths();

        var oDados = {
          Usuario: usuario,
          Nome: nome,
          ProjetoSegw: proj,
          Email: email,
        };
        this.getView()
          .getModel()
          .update(sPath[0], oDados, {
            success: function (oData, oResponse) {
              sap.m.MessageBox.success(
                that
                  .getView()
                  .getModel("i18n")
                  .getResourceBundle()
                  .getText("lblMsgUpdateOK")
              );
              that.getView().byId("idusuario").setValue("");
              that.getView().byId("idnome").setValue("");
              that.getView().byId("idproj").setValue("");
              that.getView().byId("idemail").setValue("");
            },
            error: function (oError) {
              sap.m.MessageBox.success(
                that
                  .getView()
                  .getModel("i18n")
                  .getResourceBundle()
                  .getText("lblMsgUpdateError")
              );
            },
          });
      },

      onCreate: function () {
        var that = this;
        var usuario = this.getView().byId("idusuario").getValue();
        var nome = this.getView().byId("idnome").getValue();
        var proj = this.getView().byId("idproj").getValue();
        var email = this.getView().byId("idemail").getValue();

        if (!usuario) {
          sap.m.MessageBox.error(
            this.getView()
              .getModel("i18n")
              .getResourceBundle()
              .getText("lblMsgErroUser")
          );
          return;
        }

        var oDados = {
          Usuario: usuario,
          Nome: nome,
          ProjetoSegw: proj,
          Email: email,
        };
        this.getView()
          .getModel()
          .create("/AlunoFioriSet", oDados, {
            success: function (oData, oResponse) {
              sap.m.MessageBox.success(
                that
                  .getView()
                  .getModel("i18n")
                  .getResourceBundle()
                  .getText("lblMsgCreateOK")
              );
              that.getView().byId("idusuario").setValue("");
              that.getView().byId("idnome").setValue("");
              that.getView().byId("idproj").setValue("");
              that.getView().byId("idemail").setValue("");
            },
            error: function (oError) {
              sap.m.MessageBox.success(
                that
                  .getView()
                  .getModel("i18n")
                  .getResourceBundle()
                  .getText("lblMsgCreateError")
              );
            },
          });
      },
    });
  }
);

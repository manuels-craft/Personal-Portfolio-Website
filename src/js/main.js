import { createMenuController } from "./controllers/menu-controller.js";
import { createHeaderController } from "./controllers/header-controller.js";

const menuController = createMenuController({
  openBtn: document.getElementById("open-menu-btn"),
  closeBtn: document.getElementById("close-menu-btn"),
  menu: document.getElementById("menu"),
});

const headerController = createHeaderController({
  header: document.getElementById('header')
});

menuController.init();
headerController.init();

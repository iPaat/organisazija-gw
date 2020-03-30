"use strict";
exports.__esModule = true;
var BadgeStyle_1 = require("./enums/BadgeStyle");
var Font_1 = require("./enums/Font");
var UIMenuCheckboxItem_1 = require("./items/UIMenuCheckboxItem");
var UIMenuItem_1 = require("./items/UIMenuItem");
var UIMenuListItem_1 = require("./items/UIMenuListItem");
var UIMenuSliderItem_1 = require("./items/UIMenuSliderItem");
var Container_1 = require("./modules/Container");
var ItemsCollection_1 = require("./modules/ItemsCollection");
var ListItem_1 = require("./modules/ListItem");
var ResRectangle_1 = require("./modules/ResRectangle");
var ResText_1 = require("./modules/ResText");
var Sprite_1 = require("./modules/Sprite");
var Color_1 = require("./utils/Color");
var Common_1 = require("./utils/Common");
var LiteEvent_1 = require("./utils/LiteEvent");
var Point_1 = require("./utils/Point");
var Size_1 = require("./utils/Size");
var StringMeasurer_1 = require("./modules/StringMeasurer");
var UUIDV4_1 = require("./utils/UUIDV4");
var Screen_1 = require("./utils/Screen");
var NativeUI = /** @class */ (function () {
    function NativeUI(title, subtitle, offset, spriteLibrary, spriteName) {
        this.Id = UUIDV4_1["default"]();
        this.counterPretext = "";
        this.counterOverride = undefined;
        this.lastUpDownNavigation = 0;
        this.lastLeftRightNavigation = 0;
        this._activeItem = 1000;
        this.extraOffset = 0;
        this.WidthOffset = 0;
        this.Visible = true;
        this.MouseControlsEnabled = false;
        this._justOpened = true;
        this.safezoneOffset = new Point_1["default"](0, 0);
        this.MaxItemsOnScreen = 9;
        this._maxItem = this.MaxItemsOnScreen;
        this.AUDIO_LIBRARY = "HUD_FRONTEND_DEFAULT_SOUNDSET";
        this.AUDIO_UPDOWN = "NAV_UP_DOWN";
        this.AUDIO_LEFTRIGHT = "NAV_LEFT_RIGHT";
        this.AUDIO_SELECT = "SELECT";
        this.AUDIO_BACK = "BACK";
        this.AUDIO_ERROR = "ERROR";
        this.MenuItems = [];
        // Events
        this.IndexChange = new LiteEvent_1["default"]();
        this.ListChange = new LiteEvent_1["default"]();
        this.SliderChange = new LiteEvent_1["default"]();
        this.SliderSelect = new LiteEvent_1["default"]();
        this.CheckboxChange = new LiteEvent_1["default"]();
        this.ItemSelect = new LiteEvent_1["default"]();
        this.MenuClose = new LiteEvent_1["default"]();
        this.MenuChange = new LiteEvent_1["default"]();
        this.MouseEdgeEnabled = true;
        if (!(offset instanceof Point_1["default"]))
            offset = Point_1["default"].Parse(offset);
        this.title = title;
        this.subtitle = subtitle;
        this.spriteLibrary = spriteLibrary || "commonmenu";
        this.spriteName = spriteName || "interaction_bgd";
        this.offset = new Point_1["default"](offset.X, offset.Y);
        this.Children = new Map();
        // Create everything
        this._mainMenu = new Container_1["default"](new Point_1["default"](0, 0), new Size_1["default"](700, 500), new Color_1["default"](0, 0, 0, 0));
        this._logo = new Sprite_1["default"](this.spriteLibrary, this.spriteName, new Point_1["default"](0 + this.offset.X, 0 + this.offset.Y), new Size_1["default"](431, 107));
        this._mainMenu.addItem((this._title = new ResText_1["default"](this.title, new Point_1["default"](215 + this.offset.X, 20 + this.offset.Y), 1.15, new Color_1["default"](255, 255, 255), 1, ResText_1.Alignment.Centered)));
        if (this.subtitle !== "") {
            this._mainMenu.addItem(new ResRectangle_1["default"](new Point_1["default"](0 + this.offset.X, 107 + this.offset.Y), new Size_1["default"](431, 37), new Color_1["default"](0, 0, 0, 255)));
            this._mainMenu.addItem((this._subtitle = new ResText_1["default"](this.subtitle, new Point_1["default"](8 + this.offset.X, 110 + this.offset.Y), 0.35, new Color_1["default"](255, 255, 255), 0, ResText_1.Alignment.Left)));
            if (this.subtitle.startsWith("~")) {
                this.counterPretext = this.subtitle.substr(0, 3);
            }
            this._counterText = new ResText_1["default"]("", new Point_1["default"](425 + this.offset.X, 110 + this.offset.Y), 0.35, new Color_1["default"](255, 255, 255), 0, ResText_1.Alignment.Right);
            this.extraOffset += 37;
        }
        this._upAndDownSprite = new Sprite_1["default"]("commonmenu", "shop_arrows_upanddown", new Point_1["default"](190 + this.offset.X, 147 +
            37 * (this.MaxItemsOnScreen + 1) +
            this.offset.Y -
            37 +
            this.extraOffset), new Size_1["default"](50, 50));
        this._extraRectangleUp = new ResRectangle_1["default"](new Point_1["default"](0 + this.offset.X, 144 +
            38 * (this.MaxItemsOnScreen + 1) +
            this.offset.Y -
            37 +
            this.extraOffset), new Size_1["default"](431, 18), new Color_1["default"](0, 0, 0, 200));
        this._extraRectangleDown = new ResRectangle_1["default"](new Point_1["default"](0 + this.offset.X, 144 +
            18 +
            38 * (this.MaxItemsOnScreen + 1) +
            this.offset.Y -
            37 +
            this.extraOffset), new Size_1["default"](431, 18), new Color_1["default"](0, 0, 0, 200));
        this._descriptionBar = new ResRectangle_1["default"](new Point_1["default"](this.offset.X, 123), new Size_1["default"](431, 4), Color_1["default"].Black);
        this._descriptionRectangle = new Sprite_1["default"]("commonmenu", "gradient_bgd", new Point_1["default"](this.offset.X, 127), new Size_1["default"](431, 30));
        this._descriptionText = new ResText_1["default"]("Description", new Point_1["default"](this.offset.X + 5, 125), 0.35, new Color_1["default"](255, 255, 255, 255), Font_1["default"].ChaletLondon, ResText_1.Alignment.Left);
        this._background = new Sprite_1["default"]("commonmenu", "gradient_bgd", new Point_1["default"](this.offset.X, 144 + this.offset.Y - 37 + this.extraOffset), new Size_1["default"](290, 25));
        mp.events.add("render", this.render.bind(this));
        console.log("Created Native UI! " + this.title);
    }
    Object.defineProperty(NativeUI.prototype, "CurrentSelection", {
        get: function () {
            return this._activeItem % this.MenuItems.length;
        },
        set: function (v) {
            this.MenuItems[this._activeItem % this.MenuItems.length].Selected = false;
            this._activeItem = 1000 - (1000 % this.MenuItems.length) + v;
            if (this.CurrentSelection > this._maxItem) {
                this._maxItem = this.CurrentSelection;
                this._minItem = this.CurrentSelection - this.MaxItemsOnScreen;
            }
            else if (this.CurrentSelection < this._minItem) {
                this._maxItem = this.MaxItemsOnScreen + this.CurrentSelection;
                this._minItem = this.CurrentSelection;
            }
        },
        enumerable: true,
        configurable: true
    });
    NativeUI.prototype.RecalculateDescriptionPosition = function () {
        this._descriptionBar.pos = new Point_1["default"](this.offset.X, 149 - 37 + this.extraOffset + this.offset.Y);
        this._descriptionRectangle.pos = new Point_1["default"](this.offset.X, 149 - 37 + this.extraOffset + this.offset.Y);
        this._descriptionText.pos = new Point_1["default"](this.offset.X + 8, 155 - 37 + this.extraOffset + this.offset.Y);
        this._descriptionBar.size = new Size_1["default"](431 + this.WidthOffset, 4);
        this._descriptionRectangle.size = new Size_1["default"](431 + this.WidthOffset, 30);
        var count = this.MenuItems.length;
        if (count > this.MaxItemsOnScreen + 1)
            count = this.MaxItemsOnScreen + 2;
        this._descriptionBar.pos = new Point_1["default"](this.offset.X, 38 * count + this._descriptionBar.pos.Y);
        this._descriptionRectangle.pos = new Point_1["default"](this.offset.X, 38 * count + this._descriptionRectangle.pos.Y);
        this._descriptionText.pos = new Point_1["default"](this.offset.X + 8, 38 * count + this._descriptionText.pos.Y);
    };
    NativeUI.prototype.SetMenuWidthOffset = function (widthOffset) {
        this.WidthOffset = widthOffset;
        if (this._logo != null) {
            this._logo.size = new Size_1["default"](431 + this.WidthOffset, 107);
        }
        this._mainMenu.Items[0].pos = new Point_1["default"]((this.WidthOffset + this.offset.X + 431) / 2, 20 + this.offset.Y);
        if (this._counterText) {
            this._counterText.pos = new Point_1["default"](425 + this.offset.X + widthOffset, 110 + this.offset.Y);
        }
        if (this._mainMenu.Items.length >= 2) {
            var tmp = this._mainMenu.Items[1];
            tmp.size = new Size_1["default"](431 + this.WidthOffset, 37);
        }
    };
    NativeUI.prototype.AddItem = function (item) {
        if (this._justOpened)
            this._justOpened = false;
        item.Offset = this.offset;
        item.Parent = this;
        item.SetVerticalPosition(this.MenuItems.length * 25 - 37 + this.extraOffset);
        this.MenuItems.push(item);
        item.Description = this.FormatDescription(item.Description);
        this.RefreshIndex();
        this.RecalculateDescriptionPosition();
    };
    NativeUI.prototype.RefreshIndex = function () {
        if (this.MenuItems.length == 0) {
            this._activeItem = 1000;
            this._maxItem = this.MaxItemsOnScreen;
            this._minItem = 0;
            return;
        }
        for (var i = 0; i < this.MenuItems.length; i++)
            this.MenuItems[i].Selected = false;
        this._activeItem = 1000 - (1000 % this.MenuItems.length);
        this._maxItem = this.MaxItemsOnScreen;
        this._minItem = 0;
    };
    NativeUI.prototype.Clear = function () {
        this.MenuItems = [];
        this.RecalculateDescriptionPosition();
    };
    NativeUI.prototype.Open = function () {
        Common_1["default"].PlaySound(this.AUDIO_BACK, this.AUDIO_LIBRARY);
        this.Visible = true;
        this._justOpened = true;
    };
    NativeUI.prototype.Close = function () {
        Common_1["default"].PlaySound(this.AUDIO_BACK, this.AUDIO_LIBRARY);
        this.Visible = false;
        this.RefreshIndex();
        this.MenuClose.emit();
    };
    NativeUI.prototype.GoLeft = function () {
        if (!(this.MenuItems[this.CurrentSelection] instanceof UIMenuListItem_1["default"]) &&
            !(this.MenuItems[this.CurrentSelection] instanceof UIMenuSliderItem_1["default"]))
            return;
        if (this.MenuItems[this.CurrentSelection] instanceof UIMenuListItem_1["default"]) {
            var it = this.MenuItems[this.CurrentSelection];
            if (it.Collection.length == 0)
                return;
            it.Index--;
            Common_1["default"].PlaySound(this.AUDIO_LEFTRIGHT, this.AUDIO_LIBRARY);
            this.ListChange.emit(it, it.Index);
        }
        else if (this.MenuItems[this.CurrentSelection] instanceof UIMenuSliderItem_1["default"]) {
            var it = this.MenuItems[this.CurrentSelection];
            it.Index = it.Index - 1;
            Common_1["default"].PlaySound(this.AUDIO_LEFTRIGHT, this.AUDIO_LIBRARY);
            this.SliderChange.emit(it, it.Index, it.IndexToItem(it.Index));
            // it.SliderChangedTrigger(it.Index);
        }
    };
    NativeUI.prototype.GoRight = function () {
        if (!(this.MenuItems[this.CurrentSelection] instanceof UIMenuListItem_1["default"]) &&
            !(this.MenuItems[this.CurrentSelection] instanceof UIMenuSliderItem_1["default"]))
            return;
        if (this.MenuItems[this.CurrentSelection] instanceof UIMenuListItem_1["default"]) {
            var it = this.MenuItems[this.CurrentSelection];
            if (it.Collection.length == 0)
                return;
            it.Index++;
            Common_1["default"].PlaySound(this.AUDIO_LEFTRIGHT, this.AUDIO_LIBRARY);
            this.ListChange.emit(it, it.Index);
        }
        else if (this.MenuItems[this.CurrentSelection] instanceof UIMenuSliderItem_1["default"]) {
            var it = this.MenuItems[this.CurrentSelection];
            it.Index++;
            Common_1["default"].PlaySound(this.AUDIO_LEFTRIGHT, this.AUDIO_LIBRARY);
            this.SliderChange.emit(it, it.Index, it.IndexToItem(it.Index));
            // it.SliderChangedTrigger(it.Index);
        }
    };
    NativeUI.prototype.SelectItem = function () {
        if (!this.MenuItems[this.CurrentSelection].Enabled) {
            Common_1["default"].PlaySound(this.AUDIO_ERROR, this.AUDIO_LIBRARY);
            return;
        }
        var it = this.MenuItems[this.CurrentSelection];
        if (this.MenuItems[this.CurrentSelection] instanceof UIMenuCheckboxItem_1["default"]) {
            it.Checked = !it.Checked;
            Common_1["default"].PlaySound(this.AUDIO_SELECT, this.AUDIO_LIBRARY);
            this.CheckboxChange.emit(it, it.Checked);
        }
        else {
            Common_1["default"].PlaySound(this.AUDIO_SELECT, this.AUDIO_LIBRARY);
            this.ItemSelect.emit(it, this.CurrentSelection);
            if (this.Children.has(it.Id)) {
                var subMenu = this.Children.get(it.Id);
                this.Visible = false;
                subMenu.Visible = true;
                subMenu._justOpened = true;
                this.MenuChange.emit(subMenu, true);
            }
        }
        it.fireEvent();
    };
    NativeUI.prototype.getMousePosition = function (relative) {
        var _a;
        if (relative === void 0) { relative = false; }
        var screenw = Screen_1.Screen.width;
        var screenh = Screen_1.Screen.height;
        var cursor = mp.gui.cursor.position;
        var _b = [cursor[0], cursor[1]], mouseX = _b[0], mouseY = _b[1];
        if (relative)
            _a = [cursor[0] / screenw, cursor[1] / screenh], mouseX = _a[0], mouseY = _a[1];
        return [mouseX, mouseY];
    };
    NativeUI.prototype.GetScreenResolutionMantainRatio = function () {
        var screenw = Screen_1.Screen.width;
        var screenh = Screen_1.Screen.height;
        var height = 1080.0;
        var ratio = screenw / screenh;
        var width = height * ratio;
        return new Size_1["default"](width, height);
    };
    NativeUI.prototype.IsMouseInBounds = function (topLeft, boxSize) {
        var res = this.GetScreenResolutionMantainRatio();
        var _a = this.getMousePosition(), mouseX = _a[0], mouseY = _a[1];
        return (mouseX >= topLeft.X &&
            mouseX <= topLeft.X + boxSize.Width &&
            (mouseY > topLeft.Y && mouseY < topLeft.Y + boxSize.Height));
    };
    NativeUI.prototype.IsMouseInListItemArrows = function (item, topLeft, safezone // TODO: Ability to scroll left and right
    ) {
        mp.game.invoke("0x54ce8ac98e120cab".toUpperCase(), "jamyfafi");
        mp.game.ui.addTextComponentSubstringPlayerName(item.Text);
        var res = this.GetScreenResolutionMantainRatio();
        var screenw = res.Width;
        var screenh = res.Height;
        var height = 1080.0;
        var ratio = screenw / screenh;
        var width = height * ratio;
        var labelSize = mp.game.invoke("0x85f061da64ed2f67".toUpperCase(), 0) * width * 0.35;
        var labelSizeX = 5 + labelSize + 10;
        var arrowSizeX = 431 - labelSizeX;
        return this.IsMouseInBounds(topLeft, new Size_1["default"](labelSizeX, 38))
            ? 1
            : this.IsMouseInBounds(new Point_1["default"](topLeft.X + labelSizeX, topLeft.Y), new Size_1["default"](arrowSizeX, 38))
                ? 2
                : 0;
    };
    NativeUI.prototype.ProcessMouse = function () {
        if (!this.Visible ||
            this._justOpened ||
            this.MenuItems.length == 0 ||
            !this.MouseControlsEnabled) {
            /*Common.EnableControl(0, GameControl.LookUpDown);
                Common.EnableControl(0, GameControl.LookLeftRight);
                Common.EnableControl(0, GameControl.Aim);
                Common.EnableControl(0, GameControl.Attack);*/
            this.MenuItems.filter(function (i) { return i.Hovered; }).forEach(function (i) { return (i.Hovered = false); });
            return;
        }
        if (!mp.gui.cursor.visible)
            mp.gui.cursor.visible = true;
        var limit = this.MenuItems.length - 1;
        var counter = 0;
        if (this.MenuItems.length > this.MaxItemsOnScreen + 1)
            limit = this._maxItem;
        if (this.IsMouseInBounds(new Point_1["default"](0, 0), new Size_1["default"](30, 1080)) &&
            this.MouseEdgeEnabled) {
            mp.game.cam.setGameplayCamRelativeHeading(mp.game.cam.getGameplayCamRelativeHeading() + 5.0);
            mp.game.ui.setCursorSprite(6);
        }
        else if (this.IsMouseInBounds(new Point_1["default"](this.GetScreenResolutionMantainRatio().Width - 30.0, 0), new Size_1["default"](30, 1080)) &&
            this.MouseEdgeEnabled) {
            mp.game.cam.setGameplayCamRelativeHeading(mp.game.cam.getGameplayCamRelativeHeading() - 5.0);
            mp.game.ui.setCursorSprite(7);
        }
        else if (this.MouseEdgeEnabled) {
            mp.game.ui.setCursorSprite(1);
        }
        for (var i = this._minItem; i <= limit; i++) {
            var xpos = this.offset.X;
            var ypos = this.offset.Y + 144 - 37 + this.extraOffset + counter * 38;
            var xsize = 431 + this.WidthOffset;
            var ysize = 38;
            var uiMenuItem = this.MenuItems[i];
            if (this.IsMouseInBounds(new Point_1["default"](xpos, ypos), new Size_1["default"](xsize, ysize))) {
                uiMenuItem.Hovered = true;
                if (mp.game.controls.isControlJustPressed(0, 24) ||
                    mp.game.controls.isDisabledControlJustPressed(0, 24))
                    if (uiMenuItem.Selected && uiMenuItem.Enabled) {
                        if (this.MenuItems[i] instanceof UIMenuListItem_1["default"] &&
                            this.IsMouseInListItemArrows(this.MenuItems[i], new Point_1["default"](xpos, ypos), 0) > 0) {
                            var res = this.IsMouseInListItemArrows(this.MenuItems[i], new Point_1["default"](xpos, ypos), 0);
                            switch (res) {
                                case 1:
                                    Common_1["default"].PlaySound(this.AUDIO_SELECT, this.AUDIO_LIBRARY);
                                    //this.MenuItems[i].ItemActivate(this);
                                    this.MenuItems[i].fireEvent();
                                    this.ItemSelect.emit(this.MenuItems[i], i);
                                    break;
                                case 2:
                                    var it = this.MenuItems[i];
                                    if ((it.Collection == null
                                        ? it.Items.Count
                                        : it.Collection.Count) > 0) {
                                        it.Index++;
                                        Common_1["default"].PlaySound(this.AUDIO_LEFTRIGHT, this.AUDIO_LIBRARY);
                                        this.ListChange.emit(it, it.Index);
                                    }
                                    break;
                            }
                        }
                        else
                            this.SelectItem();
                    }
                    else if (!uiMenuItem.Selected) {
                        this.CurrentSelection = i;
                        Common_1["default"].PlaySound(this.AUDIO_UPDOWN, this.AUDIO_LIBRARY);
                        this.IndexChange.emit(this.CurrentSelection);
                        this.SelectItem();
                    }
                    else if (!uiMenuItem.Enabled && uiMenuItem.Selected) {
                        Common_1["default"].PlaySound(this.AUDIO_ERROR, this.AUDIO_LIBRARY);
                    }
            }
            else
                uiMenuItem.Hovered = false;
            counter++;
        }
        var extraY = 144 +
            38 * (this.MaxItemsOnScreen + 1) +
            this.offset.Y -
            37 +
            this.extraOffset +
            this.safezoneOffset.Y;
        var extraX = this.safezoneOffset.X + this.offset.X;
        if (this.MenuItems.length <= this.MaxItemsOnScreen + 1)
            return;
        if (this.IsMouseInBounds(new Point_1["default"](extraX, extraY), new Size_1["default"](431 + this.WidthOffset, 18))) {
            this._extraRectangleUp.color = new Color_1["default"](30, 30, 30, 255);
            if (mp.game.controls.isControlJustPressed(0, 24) ||
                mp.game.controls.isDisabledControlJustPressed(0, 24)) {
                if (this.MenuItems.length > this.MaxItemsOnScreen + 1)
                    this.GoUpOverflow();
                else
                    this.GoUp();
            }
        }
        else
            this._extraRectangleUp.color = new Color_1["default"](0, 0, 0, 200);
        if (this.IsMouseInBounds(new Point_1["default"](extraX, extraY + 18), new Size_1["default"](431 + this.WidthOffset, 18))) {
            this._extraRectangleDown.color = new Color_1["default"](30, 30, 30, 255);
            if (mp.game.controls.isControlJustPressed(0, 24) ||
                mp.game.controls.isDisabledControlJustPressed(0, 24)) {
                if (this.MenuItems.length > this.MaxItemsOnScreen + 1)
                    this.GoDownOverflow();
                else
                    this.GoDown();
            }
        }
        else
            this._extraRectangleDown.color = new Color_1["default"](0, 0, 0, 200);
    };
    NativeUI.prototype.ProcessControl = function () {
        if (!this.Visible)
            return;
        if (this._justOpened) {
            this._justOpened = false;
            return;
        }
        if (mp.game.controls.isControlJustReleased(0, 177)) {
            // Back
            this.GoBack();
        }
        if (this.MenuItems.length == 0)
            return;
        if (mp.game.controls.isControlPressed(0, 172) &&
            this.lastUpDownNavigation + 120 < Date.now()) {
            // isControlJustPressed
            // Up
            this.lastUpDownNavigation = Date.now();
            if (this.MenuItems.length > this.MaxItemsOnScreen + 1)
                this.GoUpOverflow();
            else
                this.GoUp();
        }
        else if (mp.game.controls.isControlJustReleased(0, 172)) {
            this.lastUpDownNavigation = 0;
        }
        else if (mp.game.controls.isControlPressed(0, 173) &&
            this.lastUpDownNavigation + 120 < Date.now()) {
            // isControlJustPressed
            // Down
            this.lastUpDownNavigation = Date.now();
            if (this.MenuItems.length > this.MaxItemsOnScreen + 1)
                this.GoDownOverflow();
            else
                this.GoDown();
        }
        else if (mp.game.controls.isControlJustReleased(0, 173)) {
            this.lastUpDownNavigation = 0;
        }
        else if (mp.game.controls.isControlPressed(0, 174) &&
            this.lastLeftRightNavigation + 100 < Date.now()) {
            // Left
            this.lastLeftRightNavigation = Date.now();
            this.GoLeft();
        }
        else if (mp.game.controls.isControlJustReleased(0, 174)) {
            this.lastLeftRightNavigation = 0;
        }
        else if (mp.game.controls.isControlPressed(0, 175) &&
            this.lastLeftRightNavigation + 100 < Date.now()) {
            // Right
            this.lastLeftRightNavigation = Date.now();
            this.GoRight();
        }
        else if (mp.game.controls.isControlJustReleased(0, 175)) {
            this.lastLeftRightNavigation = 0;
        }
        else if (mp.game.controls.isControlJustPressed(0, 201)) {
            // Select
            this.SelectItem();
        }
    };
    NativeUI.prototype.FormatDescription = function (input) {
        if (input.length > 99)
            input = input.slice(0, 99);
        var maxPixelsPerLine = 425 + this.WidthOffset;
        var aggregatePixels = 0;
        var output = "";
        var words = input.split(" ");
        for (var _i = 0, words_1 = words; _i < words_1.length; _i++) {
            var word = words_1[_i];
            var offset = StringMeasurer_1["default"].MeasureString(word);
            aggregatePixels += offset;
            if (aggregatePixels > maxPixelsPerLine) {
                output += "\n" + word + " ";
                aggregatePixels = offset + StringMeasurer_1["default"].MeasureString(" ");
            }
            else {
                output += word + " ";
                aggregatePixels += StringMeasurer_1["default"].MeasureString(" ");
            }
        }
        return output;
    };
    NativeUI.prototype.GoUpOverflow = function () {
        if (this.MenuItems.length <= this.MaxItemsOnScreen + 1)
            return;
        if (this._activeItem % this.MenuItems.length <= this._minItem) {
            if (this._activeItem % this.MenuItems.length == 0) {
                this._minItem = this.MenuItems.length - this.MaxItemsOnScreen - 1;
                this._maxItem = this.MenuItems.length - 1;
                this.MenuItems[this._activeItem % this.MenuItems.length].Selected = false;
                this._activeItem = 1000 - (1000 % this.MenuItems.length);
                this._activeItem += this.MenuItems.length - 1;
                this.MenuItems[this._activeItem % this.MenuItems.length].Selected = true;
            }
            else {
                this._minItem--;
                this._maxItem--;
                this.MenuItems[this._activeItem % this.MenuItems.length].Selected = false;
                this._activeItem--;
                this.MenuItems[this._activeItem % this.MenuItems.length].Selected = true;
            }
        }
        else {
            this.MenuItems[this._activeItem % this.MenuItems.length].Selected = false;
            this._activeItem--;
            this.MenuItems[this._activeItem % this.MenuItems.length].Selected = true;
        }
        Common_1["default"].PlaySound(this.AUDIO_UPDOWN, this.AUDIO_LIBRARY);
        this.IndexChange.emit(this.CurrentSelection);
    };
    NativeUI.prototype.GoUp = function () {
        if (this.MenuItems.length > this.MaxItemsOnScreen + 1)
            return;
        this.MenuItems[this._activeItem % this.MenuItems.length].Selected = false;
        this._activeItem--;
        this.MenuItems[this._activeItem % this.MenuItems.length].Selected = true;
        Common_1["default"].PlaySound(this.AUDIO_UPDOWN, this.AUDIO_LIBRARY);
        this.IndexChange.emit(this.CurrentSelection);
    };
    NativeUI.prototype.GoDownOverflow = function () {
        if (this.MenuItems.length <= this.MaxItemsOnScreen + 1)
            return;
        if (this._activeItem % this.MenuItems.length >= this._maxItem) {
            if (this._activeItem % this.MenuItems.length ==
                this.MenuItems.length - 1) {
                this._minItem = 0;
                this._maxItem = this.MaxItemsOnScreen;
                this.MenuItems[this._activeItem % this.MenuItems.length].Selected = false;
                this._activeItem = 1000 - (1000 % this.MenuItems.length);
                this.MenuItems[this._activeItem % this.MenuItems.length].Selected = true;
            }
            else {
                this._minItem++;
                this._maxItem++;
                this.MenuItems[this._activeItem % this.MenuItems.length].Selected = false;
                this._activeItem++;
                this.MenuItems[this._activeItem % this.MenuItems.length].Selected = true;
            }
        }
        else {
            this.MenuItems[this._activeItem % this.MenuItems.length].Selected = false;
            this._activeItem++;
            this.MenuItems[this._activeItem % this.MenuItems.length].Selected = true;
        }
        Common_1["default"].PlaySound(this.AUDIO_UPDOWN, this.AUDIO_LIBRARY);
        this.IndexChange.emit(this.CurrentSelection);
    };
    NativeUI.prototype.GoDown = function () {
        if (this.MenuItems.length > this.MaxItemsOnScreen + 1)
            return;
        this.MenuItems[this._activeItem % this.MenuItems.length].Selected = false;
        this._activeItem++;
        this.MenuItems[this._activeItem % this.MenuItems.length].Selected = true;
        Common_1["default"].PlaySound(this.AUDIO_UPDOWN, this.AUDIO_LIBRARY);
        this.IndexChange.emit(this.CurrentSelection);
    };
    NativeUI.prototype.GoBack = function () {
        Common_1["default"].PlaySound(this.AUDIO_BACK, this.AUDIO_LIBRARY);
        this.Visible = false;
        if (this.ParentMenu != null) {
            this.ParentMenu.Visible = true;
            this.ParentMenu._justOpened = true;
            this.MenuChange.emit(this.ParentMenu, false);
        }
        this.MenuClose.emit();
    };
    NativeUI.prototype.BindMenuToItem = function (menuToBind, itemToBindTo) {
        menuToBind.ParentMenu = this;
        menuToBind.ParentItem = itemToBindTo;
        this.Children.set(itemToBindTo.Id, menuToBind);
    };
    NativeUI.prototype.ReleaseMenuFromItem = function (releaseFrom) {
        if (!this.Children.has(releaseFrom.Id))
            return false;
        var menu = this.Children.get(releaseFrom.Id);
        menu.ParentItem = null;
        menu.ParentMenu = null;
        this.Children["delete"](releaseFrom.Id);
        return true;
    };
    NativeUI.prototype.render = function () {
        if (!this.Visible)
            return;
        if (this._justOpened) {
            if (this._logo != null && !this._logo.IsTextureDictionaryLoaded)
                this._logo.LoadTextureDictionary();
            if (!this._background.IsTextureDictionaryLoaded)
                this._background.LoadTextureDictionary();
            if (!this._descriptionRectangle.IsTextureDictionaryLoaded)
                this._descriptionRectangle.LoadTextureDictionary();
            if (!this._upAndDownSprite.IsTextureDictionaryLoaded)
                this._upAndDownSprite.LoadTextureDictionary();
        }
        this._mainMenu.Draw();
        this.ProcessMouse();
        this.ProcessControl();
        this._background.size =
            this.MenuItems.length > this.MaxItemsOnScreen + 1
                ? new Size_1["default"](431 + this.WidthOffset, 38 * (this.MaxItemsOnScreen + 1))
                : new Size_1["default"](431 + this.WidthOffset, 38 * this.MenuItems.length);
        this._background.Draw();
        if (this.MenuItems.length > 0) {
            this.MenuItems[this._activeItem % this.MenuItems.length].Selected = true;
            if (this.MenuItems[this._activeItem % this.MenuItems.length].Description.trim() !== "") {
                this.RecalculateDescriptionPosition();
                var descCaption = this.MenuItems[this._activeItem % this.MenuItems.length].Description;
                // descCaption = this.FormatDescription(descCaption);
                this._descriptionText.caption = descCaption;
                var numLines = this._descriptionText.caption.split("\n").length;
                this._descriptionRectangle.size = new Size_1["default"](431 + this.WidthOffset, numLines * 25 + 15);
                this._descriptionBar.Draw();
                this._descriptionRectangle.Draw();
                this._descriptionText.Draw();
            }
        }
        if (this.MenuItems.length <= this.MaxItemsOnScreen + 1) {
            var count = 0;
            for (var _i = 0, _a = this.MenuItems; _i < _a.length; _i++) {
                var item_1 = _a[_i];
                item_1.SetVerticalPosition(count * 38 - 37 + this.extraOffset);
                item_1.Draw();
                count++;
            }
            if (this._counterText && this.counterOverride) {
                this._counterText.caption = this.counterPretext + this.counterOverride;
                this._counterText.Draw();
            }
        }
        else {
            var count = 0;
            for (var index = this._minItem; index <= this._maxItem; index++) {
                var item = this.MenuItems[index];
                item.SetVerticalPosition(count * 38 - 37 + this.extraOffset);
                item.Draw();
                count++;
            }
            this._extraRectangleUp.size = new Size_1["default"](431 + this.WidthOffset, 18);
            this._extraRectangleDown.size = new Size_1["default"](431 + this.WidthOffset, 18);
            this._upAndDownSprite.pos = new Point_1["default"](190 + this.offset.X + this.WidthOffset / 2, 147 +
                37 * (this.MaxItemsOnScreen + 1) +
                this.offset.Y -
                37 +
                this.extraOffset);
            this._extraRectangleUp.Draw();
            this._extraRectangleDown.Draw();
            this._upAndDownSprite.Draw();
            if (this._counterText) {
                if (!this.counterOverride) {
                    var cap = this.CurrentSelection + 1 + " / " + this.MenuItems.length;
                    this._counterText.caption = this.counterPretext + cap;
                }
                else {
                    this._counterText.caption =
                        this.counterPretext + this.counterOverride;
                }
                this._counterText.Draw();
            }
        }
        this._logo.Draw();
    };
    return NativeUI;
}());
exports["default"] = NativeUI;
exports.Menu = NativeUI;
exports.UIMenuItem = UIMenuItem_1["default"];
exports.UIMenuListItem = UIMenuListItem_1["default"];
exports.UIMenuCheckboxItem = UIMenuCheckboxItem_1["default"];
exports.UIMenuSliderItem = UIMenuSliderItem_1["default"];
exports.BadgeStyle = BadgeStyle_1["default"];
exports.Point = Point_1["default"];
exports.Size = Size_1["default"];
exports.Color = Color_1["default"];
exports.Font = Font_1["default"];
exports.ItemsCollection = ItemsCollection_1["default"];
exports.ListItem = ListItem_1["default"];

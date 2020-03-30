class Browser {
    constructor() {

    }

    /**
     * Sets the url of the clients browser.
     *
     * @param player
     * @param url
     * @param enableCursor
     */
    setUrl(player: PlayerMp, url: string, enableCursor: boolean) {
        player.call("cBrowser-SetUrl", [url, enableCursor]);
    }

    /**
     * Executes javascript code in the client browser.
     *
     * @param player
     * @param data
     */
    pasteJs(player: PlayerMp, data: string) {
        player.call("cBrowser-PasteJs", [data]);
    }
}

export default new Browser();
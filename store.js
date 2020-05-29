let Bot = (function () {
    let instance;
    class Bot {
        constructor(bot) {
            this._bot = bot
        }
        get bot() {
            return this._bot
        }
        set bot(new_bot) {
            this._bot = new_bot
        }
    }

    function createInstance(bot) {
        let object = new Bot(bot);
        return object;
    }

    return {
        get: function () {
            return instance;
        },
        store: function (bot) {
            if (!instance) {
                instance = createInstance(bot);
            }
            return instance;
        }
    };
})();

exports.Bot = Bot;
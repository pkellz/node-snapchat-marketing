function AdAccount(snap) {
    this.snap = snap;
    this.urls = {
        allAdAccounts: "https://adsapi.snapchat.com/v1/organizations",
        specificAdAccount: "https://adsapi.snapchat.com/v1/adaccounts"
    };
}

AdAccount.prototype.getAll = function(org_id, callback) {
    if (typeof org_id === "function")
        throw new Error("Must pass in an Ad Account Id");

    this.snap.request(
        `${this.urls.allAdAccounts}/${org_id}/adaccounts`,
        { method: "GET" },
        callback
    );
};

AdAccount.prototype.getById = function(ad_account_id, callback) {
    if (typeof ad_account_id === "function")
        throw new Error("Must pass in an Ad Account Id");

    this.snap.request(
        `${this.urls.specificAdAccount}/${ad_account_id}`,
        { method: "GET" },
        callback
    );
};

AdAccount.prototype.getStats = function(ad_account_id, options, callback) {
    if (typeof ad_account_id === "function")
        throw new Error("Must pass in an Ad Account Id");

    serialize = function(obj) {
        var str = [];
        for (var p in obj)
            if (obj.hasOwnProperty(p)) {
                str.push(
                    encodeURIComponent(p) + "=" + encodeURIComponent(obj[p])
                );
            }
        return str.join("&");
    };

    this.snap.request(
        `${this.urls.specificAdAccount}/${ad_account_id}/stats?${serialize(options)}`,
        { method: "GET" },
        callback
    );
};

AdAccount.prototype.updateSpendCap = function(source_id, callback) {};

module.exports = AdAccount;

const shibboleth = (req, res, next) => {
    let headers = req.headers;
    let user = {};

    console.log(headers);
    console.log(headers["affiliation"]);

    if (!headers["displayname"] || !headers["mail"] || !headers["affiliation"] || !headers["sn"] || !headers["givenname"]) {
        res.status(503).send("Error with UNC shibboleth authentication. Please log in again.");
    } else {
        user = {
            fullName: headers["displayname"],
            firstName: headers["givenname"],
            lastName: headers["sn"],
            email: headers["mail"],
            affiliation: headers["affiliation"].replaceAll("@unc.edu", "").split(";"),
        }

        req.user = user;
        next();
    }
}

module.exports = shibboleth;
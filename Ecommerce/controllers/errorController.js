// Method die alle request naar niet-bestaande routes regelt zonder dat de pagina crashed.
exports.get404 = (req, res, next) => {
    res.status(404).render("error/404", {
        pageTitle: "Page Not Found",
        path
    })
}
const getVacations = async () => Promise.resolve(
    [{ type: "annual", name: "Paid annual leave" },
    { type: "unpaid", name: "Unpaid annual leave" },
    { type: "blood", name: "Blood donation leav" }
    ]);

module.exports =  { getVacations };
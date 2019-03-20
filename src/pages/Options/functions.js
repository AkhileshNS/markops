
export const createPlaceholders = (placeholder, count) => {
    let placeholders = [];
    for (let i=0; i<count; i++) {
        placeholders.push(placeholder);
    }
    return placeholders;
}

/*
    ISE: {
        I: {
            A: {
                subject: "SEO, SNA"
            }
        }
    }
*/
export const getRows = deps => {
    let rows = [];
    let abbr = {};
    for (let dep in deps) {
        for (let Class in deps[dep]) {
            if (Class!=="name") {
                for (let section in deps[dep][Class]) {
                    for (let subject of deps[dep][Class][section].subjects.split(",")) {
                        rows.push({
                            department: dep,
                            class: Class,
                            section,
                            subject
                        });
                    }
                }
            } else {
                abbr[dep] = deps[dep][Class];
            }
        }
    }
    if (rows.length<1000) {
        rows = [
            ...rows, 
            ...createPlaceholders({department: "", class: "", section: "", subject: ""}, 1000 - rows.length)
        ]
    } 
    return {rows, abbr};
}

export const validateRows = rows => {
    for (let row of rows) {
        if (!((row.department==="" && row.class==="" && row.section==="" && row.subject==="") 
        || (row.department!=="" && row.class!=="" && row.section!=="" && row.subject!==""))) {
            return "All of the columns in a row must either be empty or hold a value. Any one column in a row cannot be empty while the other have values";
        }
        if (!/^[a-zA-Z]+$/g.test(row.department) && row.department!=="") {
            return "Department can only have alphabets";
        }
        if (!/^[IVX]+$/g.test(row.class) && row.class!=="") {
            return "Classes can only have roman numerals";
        }
        if (!/^[a-zA-Z]+$/g.test(row.section) && row.section!=="") {
            return "Sections can only have alphabets";
        }
        if (!/^[a-zA-Z]+$/g.test(row.subject) && row.subject!=="") {
            return "Subjects can only have alphabets";
        }
    }
    return 1;
}

export const getDepsFromRows = (rows, abbr) => {
    let deps = {};
    for (let row of rows) {
        if (row.department!=="") {
            if (!(row.department in deps)) {
                deps[row.department] = {name: abbr[row.department]};
            }
            if (!(row.class in deps[row.department])) {
                deps[row.department][row.class] = {};
            }
            if (!(row.section in deps[row.department][row.class])) {
                deps[row.department][row.class][row.section] = {
                    subjects: ""
                };
            }
            let subjects = (deps[row.department][row.class][row.section].subjects!=="" ? deps[row.department][row.class][row.section].subjects.split(",") : []);
            subjects.push(row.subject);
            deps[row.department][row.class][row.section] = {
                subjects: subjects.join(",")
            };
        }
    }
    return deps;
}
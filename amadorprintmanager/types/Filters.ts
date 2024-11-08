

export interface Filter {
    name: string
    catagory: string
    inputTypes: any[]
    inputs: any[]
    shouldRemove(o: string): boolean

}
export abstract class Filter implements Filter {
    constructor(inputs: any[], catagory: string) {
        this.catagory = catagory
        this.inputs = inputs
    }
    inputs: any[]
}
class Not extends Filter {
    name = "Not"
    inputTypes = [String]
    shouldRemove(o: string): boolean {

        return o != this.inputs[0]
    }
}
class NotContains extends Filter {
    name = "Doesn't Contain"
    inputTypes = [String]
    shouldRemove(o: string): boolean {
        return o.includes(this.inputs[0])
    }
}
class Contains extends Filter {
    name = "Contains"
    inputTypes = [String]
    shouldRemove(o: string): boolean {
        return !o.includes(this.inputs[0])
    }
    
}
class Is extends Filter {
    name = "Is"
    inputTypes = [String]
    shouldRemove(o: string): boolean {
        return o == this.inputs[0]
    }
}   

export const FilterTypes = [
    Not,
    NotContains,
    Contains,
    Is,
]

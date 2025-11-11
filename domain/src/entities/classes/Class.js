export class Class {
    props;
    constructor(props) {
        this.props = props;
    }
    static create(data) {
        return new Class({
            _id: crypto.randomUUID(),
            ...data,
        });
    }
    toPrimitives() {
        return this.props;
    }
}

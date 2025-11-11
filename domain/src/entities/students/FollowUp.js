export class FollowUp {
    props;
    constructor(props) {
        this.props = props;
    }
    toPrimitives() {
        return this.props;
    }
    static create(data) {
        return new FollowUp({ _id: crypto.randomUUID(), ...data });
    }
}

import { useState } from 'react';
import { useHistory } from "react-router-dom";
import dayjs from 'dayjs';
import _ from 'lodash';
import firebase from 'firebase';

import { formatTagName } from '../../utils/format';
import useAuthState from '../../hooks/useAuthState';

import './NewEntry.scss';

const tags = [
    'story',
    'opportunity',
    'food',
    'idea',
    'habit',
    'exercise',
    'quote'
];

export default function NewEntry(props) {
    const history = useHistory();
    const [user] = useAuthState();

    const [state, setState] = useState({
        tags: [],
        text: '',
        date: dayjs(),
        userId: user.uid
    });

    const addEntry = () => {
        const firestore = firebase.firestore();

        firestore.collection('entries').add({
            ...state,
            date: dayjs(state.date).toDate(),
        });
    };

    const onChangeTags = ({ target }) => {
        const { value: tag } = target;

        setState({ ...state, tags: _.xor([tag], state.tags) });
    };

    const onChangeText = ({ target }) => {
        const { value: text } = target;

        setState({ ...state, text });
    };

    const onChangeDate = ({ target }) => {
        const { value: date } = target;

        setState({ ...state, date });
    };

    const onSubmit = (event) => {
        event.preventDefault();

        if (_.isEmpty(state.tags) || _.isEmpty(state.text)) {
            return;
        }

        addEntry();
        history.push('/');
    };

    const renderTagSelect = () => {
        return (
            <label className="tag-input">
                Tags
                <select className="tag-select"
                    multiple={true}
                    value={state.tags}
                    onChange={onChangeTags}
                >
                    {tags.map((tag) => {
                        return <option key={tag} value={tag}>{formatTagName(tag)}</option>;
                    })}
                </select>
            </label>
        );
    };

    const renderTextArea = () => {
        return (
            <label className="text-input">
                Text
                <textarea value={state.text} onChange={onChangeText} />
            </label>
        );
    };

    const renderDatePicker = () => {
        return (
            <label className="date-input">
                Date
                <input type="datetime-local" value={dayjs(state.date).format('YYYY-MM-DDTHH:mm')} max={dayjs().toDate()} onChange={onChangeDate}></input>
            </label>
        );
    };

    return (
        <form className="new-entry"
            onSubmit={onSubmit}
        >
            {renderTagSelect()}
            {renderTextArea()}
            {renderDatePicker()}
            <input className="submit-button" type="submit" value="Save" />
        </form>
    );
}

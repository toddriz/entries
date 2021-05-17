import { useState } from 'react';
import { useHistory } from "react-router-dom";
import _ from 'lodash';
import { addEntry } from '../../mocks/entries';
import { formatTagName } from '../../utils/format';
import './NewEntry.scss';
import dayjs from 'dayjs';

const tags = [
    'story',
    'opportunity',
    'food',
    'idea',
    'habit',
    'exercise'
];

export default function NewEntry(props) {
    const history = useHistory();

    const [state, setState] = useState({
        tags: [],
        text: '',
        date: dayjs().format('YYYY-MM-DD')
    });

    const onChangeTags = ({ target }) => {
        const { value } = target;

        setState({ ...state, tags: _.xor([value], state.tags) });
    };

    const onChangeText = ({ target }) => {
        const { value } = target;

        setState({ ...state, text: value });
    };

    const onChangeDate = ({ target }) => {
        const { value } = target;

        setState({ ...state, date: value });
    };

    const onSubmit = (event) => {
        event.preventDefault();

        if (_.isEmpty(state.tags) || _.isEmpty(state.text)) {
            return;
        }

        addEntry(state.text, state.tags, state.date);
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
                <input type="date" value={state.date} onChange={onChangeDate}></input>
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

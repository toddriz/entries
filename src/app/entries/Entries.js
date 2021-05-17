import dayjs from 'dayjs';
import { getEntries } from '../../mocks/entries';
import { formatTagName } from '../../utils/format';

import './Entries.scss';

function Entries() {
    const entries = getEntries();

    const renderTags = (tags) => {

        return (
            <div className="tags">
                <label>Tags</label>
                {tags.map((tag) => {
                    return (
                        <div key={tag} className="tag">{formatTagName(tag)}</div>
                    );
                })}
            </div>
        );
    };

    const renderEntry = (entry) => {
        return (
            <div key={entry.id} className="entry">
                {renderTags(entry.tags)}
                <div className="text">{entry.text}</div>
                <div className="date">Date: {dayjs(entry.timestamp).format('MMM DD, YYYY')}</div>
            </div>
        );
    };

    return (
        <div className="entries">
            {entries.length === 0 ? 'No Entries' : entries.map(renderEntry)}
        </div>
    );
}

export default Entries;

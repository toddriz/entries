import dayjs from 'dayjs';
import useGetEntries from '../../hooks/useGetEntries';
import { formatTagName } from '../../utils/format';

import './Entries.scss';

function Entries() {
    const [entries, isEntriesLoading, entriesError] = useGetEntries();

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
                <div className="date">{dayjs(entry.date.seconds * 1000).format('MMM DD, YYYY h:mm a')}</div>
            </div>
        );
    };

    return (
        <div className="entries">
            {entriesError && <div>Error Loading Entries</div>}
            {isEntriesLoading && <div>Loading Entries</div>}
            {entries.length === 0 ? 'No Entries' : entries.map(renderEntry)}
        </div>
    );
}

export default Entries;

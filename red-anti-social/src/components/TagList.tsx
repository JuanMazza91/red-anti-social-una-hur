
import { Badge } from 'react-bootstrap';
import type { Tag } from '../types/Index'; 

type TagListProps = {
  tags: Tag[];
};

function TagList({tags}:TagListProps) {
  return (
    <div className="d-flex flex-wrap gap-2">
      {tags.map((tag) => (
        <Badge key={tag._id} className="badge bg-success text-white border border-2 border-dark rounded-0 px-3 py-1 text-xs fw-bold">
          {tag.nombre}
        </Badge>
      ))}
    </div>
  );
};

export default TagList;


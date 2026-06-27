
import { Badge } from 'react-bootstrap';
import type { Tag } from '../types/Index'; 

type TagListProps = {
  tags: Tag[];
};

function TagList({tags}:TagListProps) {
  return (
    <div className="d-flex flex-wrap gap-2">
      {tags.map((tag) => (
        <Badge key={tag._id} bg="secondary" text="white">
          {tag.nombre}
        </Badge>
      ))}
    </div>
  );
};

export default TagList;


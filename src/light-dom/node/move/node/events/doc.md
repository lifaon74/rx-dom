3 kind of 'moves':

- attach: a detached node is attached to another node => emits null
- detach: an attached node is detached (no more parents) => emits old parent node
- move: an attached node changes of parent (but doesn't pass through a 'no-parent' phase) => emits old parent node

ALL EVENTS APPEND AFTER THE MOVE IS DONE, AND EMITS THEIR LAST PARENT NODE (BEFORE THE MOVE)

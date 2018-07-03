## Origami Matrix
ORIPA generated OR matrix used in a threejs shader to render a origami flat folding model correctly.

`docs/origami_rendering2009.pdf` is the base of my assumption that this should be possible.

ORIPA -> FOLD.. -> FOLDED ORIGAMI Window -> Save as *.ormat
to get the vertices, faces and the overlap matrix.

Now create a threejs object from that data plus a shader that wil use the matrix information for a proper rendering.

step1: parse ormat files
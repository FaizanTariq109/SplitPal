router.post('/create', authMiddleware, createGroup);
router.post('/join', authMiddleware, joinGroup);
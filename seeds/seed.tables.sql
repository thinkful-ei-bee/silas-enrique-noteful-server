INSERT INTO folders (id, name)
VALUES
  (1, 'Important'),
  (2, 'Super'),
  (3, 'Spangley');

INSERT INTO notes (id, name, folderId, content)
VALUES
  (1, 'Dogs', 1, 'Corporis accusamus placeat'),
  (2, 'Cats', 3, 'Occaecati dignissimos placeat'),
  (3, 'Birds', 2, 'Occaecati dignissimos placeat');

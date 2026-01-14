-- Eduba Seed Data
-- Run this after creating the schema to populate initial content

-- The Stoics Path
INSERT INTO passages (path, title, author, content, difficulty_order) VALUES
('stoics', 'Fear of Death', 'Marcus Aurelius', 'It is not death that a man should fear, but he should fear never beginning to live.', 1),
('stoics', 'Power Over Mind', 'Marcus Aurelius', 'You have power over your mind - not outside events. Realize this, and you will find strength.', 2),
('stoics', 'Imagination vs Reality', 'Seneca', 'We suffer more often in imagination than in reality.', 3),
('stoics', 'Present Moment', 'Marcus Aurelius', 'Confine yourself to the present.', 4),
('stoics', 'Virtue and Wisdom', 'Seneca', 'Every new beginning comes from some other beginning''s end.', 5),
('stoics', 'Obstacles as Path', 'Marcus Aurelius', 'The impediment to action advances action. What stands in the way becomes the way.', 6),
('stoics', 'Inner Tranquility', 'Epictetus', 'Wealth consists in not having great possessions, but in having few wants.', 7),
('stoics', 'Time and Life', 'Seneca', 'Life is long if you know how to use it.', 8),
('stoics', 'Change and Acceptance', 'Marcus Aurelius', 'Loss is nothing else but change, and change is Nature''s delight.', 9),
('stoics', 'Focus on Controllable', 'Epictetus', 'Some things are in our control and others not. Things in our control are opinion, pursuit, desire, aversion, and, in a word, whatever are our own actions.', 10);

-- The Founders Path
INSERT INTO passages (path, title, author, content, difficulty_order) VALUES
('founders', 'Self-Evident Truths', 'Declaration of Independence', 'We hold these truths to be self-evident, that all men are created equal.', 1),
('founders', 'Life, Liberty and Pursuit', 'Declaration of Independence', 'Life, Liberty and the pursuit of Happiness.', 2),
('founders', 'We the People', 'Constitution', 'We the People of the United States, in Order to form a more perfect Union.', 3),
('founders', 'Government Powers', 'Declaration of Independence', 'Governments are instituted among Men, deriving their just powers from the consent of the governed.', 4),
('founders', 'Liberty Tree', 'Thomas Jefferson', 'The tree of liberty must be refreshed from time to time with the blood of patriots and tyrants.', 5),
('founders', 'Eternal Vigilance', 'Thomas Jefferson', 'The price of freedom is eternal vigilance.', 6),
('founders', 'United We Stand', 'Aesop / Benjamin Franklin', 'United we stand, divided we fall.', 7),
('founders', 'Justice and Equality', 'Constitution Preamble', 'We the People of the United States, in Order to form a more perfect Union, establish Justice, insure domestic Tranquility, provide for the common defence, promote the general Welfare, and secure the Blessings of Liberty to ourselves and our Posterity, do ordain and establish this Constitution for the United States of America.', 8),
('founders', 'Give Me Liberty', 'Patrick Henry', 'Give me liberty, or give me death!', 9),
('founders', 'Four Score and Seven', 'Abraham Lincoln', 'Four score and seven years ago our fathers brought forth on this continent, a new nation, conceived in Liberty, and dedicated to the proposition that all men are created equal.', 10);

-- The Poets Path
INSERT INTO passages (path, title, author, content, difficulty_order) VALUES
('poets', 'Road Less Traveled', 'Robert Frost', 'Two roads diverged in a wood, and I— I took the one less traveled by, and that has made all the difference.', 1),
('poets', 'If You Can Keep Your Head', 'Rudyard Kipling', 'If you can keep your head when all about you are losing theirs and blaming it on you.', 2),
('poets', 'Hope is the Thing', 'Emily Dickinson', 'Hope is the thing with feathers that perches in the soul.', 3),
('poets', 'I Am the Master', 'William Ernest Henley', 'I am the master of my fate, I am the captain of my soul.', 4),
('poets', 'Do Not Go Gentle', 'Dylan Thomas', 'Do not go gentle into that good night.', 5),
('poets', 'Because I Could Not Stop', 'Emily Dickinson', 'Because I could not stop for Death, he kindly stopped for me.', 6),
('poets', 'Shall I Compare Thee', 'William Shakespeare', 'Shall I compare thee to a summer''s day? Thou art more lovely and more temperate.', 7),
('poets', 'I Sing the Body Electric', 'Walt Whitman', 'I sing the body electric, the armies of those I love engirth me and I engirth them.', 8),
('poets', 'Stopping by Woods', 'Robert Frost', 'Whose woods these are I think I know. His house is in the village though; He will not see me stopping here To watch his woods fill up with snow.', 9),
('poets', 'The Road Not Taken', 'Robert Frost', 'Two roads diverged in a yellow wood, And sorry I could not travel both And be one traveler, long I stood And looked down one as far as I could To where it bent in the undergrowth.', 10);
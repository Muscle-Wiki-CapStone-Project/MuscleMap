"""Added description to UserWorkout

Revision ID: f1d647548f83
Revises: eca8abb9e07f
Create Date: 2025-02-06 22:31:12.348426

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'f1d647548f83'
down_revision = 'eca8abb9e07f'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user_workouts', schema=None) as batch_op:
        batch_op.add_column(sa.Column('description', sa.Text(), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user_workouts', schema=None) as batch_op:
        batch_op.drop_column('description')

    # ### end Alembic commands ###

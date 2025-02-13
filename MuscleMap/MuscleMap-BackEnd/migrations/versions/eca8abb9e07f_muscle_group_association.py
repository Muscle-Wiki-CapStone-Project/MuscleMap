"""muscle group association

Revision ID: eca8abb9e07f
Revises: d5840a2f9117
Create Date: 2025-02-03 16:28:04.740413

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'eca8abb9e07f'
down_revision = 'd5840a2f9117'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('exercises', schema=None) as batch_op:
        batch_op.alter_column('muscle_group_id',
               existing_type=sa.INTEGER(),
               nullable=False)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('exercises', schema=None) as batch_op:
        batch_op.alter_column('muscle_group_id',
               existing_type=sa.INTEGER(),
               nullable=True)

    # ### end Alembic commands ###

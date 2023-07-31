"""change name column on user

Revision ID: c3b73b9fb397
Revises: 5dfc9ead2114
Create Date: 2023-07-31 15:58:01.172776

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'c3b73b9fb397'
down_revision = '5dfc9ead2114'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.add_column(sa.Column('name', sa.String(), nullable=True))
        batch_op.drop_column('description')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.add_column(sa.Column('description', sa.VARCHAR(), nullable=True))
        batch_op.drop_column('name')

    # ### end Alembic commands ###

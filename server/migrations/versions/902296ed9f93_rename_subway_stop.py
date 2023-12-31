"""rename subway stop

Revision ID: 902296ed9f93
Revises: 3ae8faee41a4
Create Date: 2023-07-18 15:03:42.355342

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '902296ed9f93'
down_revision = '3ae8faee41a4'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('subwaystops', schema=None) as batch_op:
        batch_op.add_column(sa.Column('stationname', sa.String(), nullable=True))
        batch_op.drop_column('stationinitials')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('subwaystops', schema=None) as batch_op:
        batch_op.add_column(sa.Column('stationinitials', sa.VARCHAR(), nullable=True))
        batch_op.drop_column('stationname')

    # ### end Alembic commands ###
